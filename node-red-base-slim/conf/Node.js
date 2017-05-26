/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var util = require("util");
var EventEmitter = require("events").EventEmitter;
var when = require("when");

var redUtil = require("../util");
var Log = require("../log");
var context = require("./context");
var flows = require("./flows");

function Node(n) {
    this.id = n.id;
    this.type = n.type;
    this.z = n.z;
    this._closeCallbacks = [];

    //added by tlodge to record data path
    this._receivedFrom = [];
    this._sent = {};
    //end of added by tlodge

    if (n.name) {
        this.name = n.name;
    }
    if (n._alias) {
        this._alias = n._alias;
    }
    this.updateWires(n.wires);
}

util.inherits(Node, EventEmitter);

Node.prototype.updateWires = function(wires) {
    //console.log("UPDATE",this.id);
    this.wires = wires || [];
    delete this._wire;

    var wc = 0;
    this.wires.forEach(function(w) {
        wc+=w.length;
    });
    this._wireCount = wc;
    if (wc === 0) {
        // With nothing wired to the node, no-op send
        this.send = function(msg) {}
    } else {
        this.send = Node.prototype.send;
        if (this.wires.length === 1 && this.wires[0].length === 1) {
            // Single wire, so we can shortcut the send when
            // a single message is sent
            this._wire = this.wires[0][0];
        }
    }

}
Node.prototype.context = function() {
    if (!this._context) {
         this._context = context.get(this._alias||this.id,this.z);
    }
    return this._context;
}

Node.prototype._on = Node.prototype.on;

Node.prototype.on = function(event, callback) {
    var node = this;
    if (event == "close") {
        this._closeCallbacks.push(callback);
    } else {
        this._on(event, callback);
    }
};

Node.prototype.close = function() {
    var promises = [];
    var node = this;
    for (var i=0;i<this._closeCallbacks.length;i++) {
        var callback = this._closeCallbacks[i];
        if (callback.length == 1) {
            promises.push(
                when.promise(function(resolve) {
                    callback.call(node, function() {
                        resolve();
                    });
                })
            );
        } else {
            callback.call(node);
        }
    }
    if (promises.length > 0) {
        return when.settle(promises).then(function() {
            if (this._context) {
                 context.delete(this._alias||this.id,this.z);
            }
        });
    } else {
        if (this._context) {
             context.delete(this._alias||this.id,this.z);
        }
        return;
    }
};

Node.prototype.send = function(msg) {
    var msgSent = false;
    var node;

    if (msg === null || typeof msg === "undefined") {
        return;
    } else if (!util.isArray(msg)) {
        if (this._wire) {
            // A single message and a single wire on output 0       
            // TODO: pre-load flows.get calls - cannot do in constructor
            //       as not all nodes are defined at that point         
            if (!msg._msgid) {
                msg._msgid = redUtil.generateId();
            }

            //added by tlodge to record path
            msg._dataid = redUtil.generateId();
           
            this.metric("send",msg);

            node = flows.get(this._wire);
            /* istanbul ignore else */
            if (node) {
                //added by tlodge to record path
                this._sent[this._wire] = redUtil.cloneMessage(msg);
                node.receive(msg, this.id);
            }
            return;
        } else {
            msg = [msg];
        }
    }

    var numOutputs = this.wires.length;

    // Build a list of send events so that all cloning is done before   
    // any calls to node.receive                                        
    var sendEvents = [];

    var sentMessageId = null;

    //added by tlodge to record path
    var sentMessageDataId = null;

    // for each output of node eg. [msgs to output 0, msgs to output 1, ...]
    for (var i = 0; i < numOutputs; i++) {
        var wires = this.wires[i]; // wires leaving output i                
        /* istanbul ignore else */
        if (i < msg.length) {
            var msgs = msg[i]; // msgs going to output i                    
            if (msgs !== null && typeof msgs !== "undefined") {
                if (!util.isArray(msgs)) {
                    msgs = [msgs];
                }
                var k = 0;
                // for each recipent node of that output                    
                for (var j = 0; j < wires.length; j++) {
                    node = flows.get(wires[j]); // node at end of wire j    
                    if (node) {
                        // for each msg to send eg. [[m1, m2, ...], ...]    
                        for (k = 0; k < msgs.length; k++) {
                            var m = msgs[k];
                            if (m !== null && m !== undefined) {
                                /* istanbul ignore else */
                                if (!sentMessageId) {
                                    sentMessageId = m._msgid;
                                }

                                //added by tlodge
                                if (!sentMessageDataId){
                                    sentMessageDataId = m._dataid;
                                }

                                if (msgSent) {
                                    var clonedmsg = redUtil.cloneMessage(m);
                                    sendEvents.push({n:node,m:clonedmsg});
                                } else {
                                    sendEvents.push({n:node,m:m});
                                    msgSent = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /* istanbul ignore else */
    if (!sentMessageId) {
        sentMessageId = redUtil.generateId();
    }

    //added by tlodge
    if (!sentMessageDataId){
        sentMessageDataId = redUtil.generateId();
    }

    this.metric("send",{_msgid:sentMessageId});

    for (i=0;i<sendEvents.length;i++) {
        var ev = sendEvents[i];
        /* istanbul ignore else */
        if (!ev.m._msgid) {
            ev.m._msgid = sentMessageId;
        }
        
        ev.m._dataid = sentMessageDataId;

        this._sent[ev.n.id] = redUtil.cloneMessage(ev.m);
        ev.n.receive(ev.m,this.id);
    }
};

Node.prototype.receive = function(msg, fromnid) {
    if (!msg) {
        msg = {};
    }
    if (!msg._msgid) {
        msg._msgid = redUtil.generateId();
    }
    if (!msg._dataid){
        msg._dataid = redUtil.generateId();
    }

    //added by tlodge to record the data path
    if (this._receivedFrom.indexOf(fromnid) === -1){
        this._receivedFrom.push(fromnid);
    }

    this.metric("receive",msg);

    try {
        this.emit("input", msg);
    } catch(err) {
        this.error(err,msg);
    }
};

Node.prototype.path = function(){
    
    var path = [];
    var data = {};

    var parents = this._receivedFrom;
   
    if (parents && parents.length > 0){
        for (var i = 0; i < parents.length; i++){
            _traverse(parents[i], this.id, path, data);
        }
    }
    return {hops:path, data:data};
}

function _traverse(source, target, path, data){
    var node = flows.get(source);
    var msg = node._sent[target];

    var hop = {source:source, target: target, msg:msg._dataid}
    path.push(hop);
    data[msg._dataid]=msg;

    var parents = node._receivedFrom;
    
    for (var i = 0; i < parents.length; i++){
        _traverse(parents[i], source, path, data);
    }
}

function log_helper(self, level, msg) {
    var o = {
        level: level,
        id: self.id,
        type: self.type,
        msg: msg
    };
    if (self.name) {
        o.name = self.name;
    }
    Log.log(o);
}

Node.prototype.log = function(msg) {
    log_helper(this, Log.INFO, msg);
};

Node.prototype.warn = function(msg) {
    log_helper(this, Log.WARN, msg);
};

Node.prototype.error = function(logMessage,msg) {
    if (typeof logMessage != 'boolean') {
        logMessage = logMessage || "";
    }
    log_helper(this, Log.ERROR, logMessage);
    /* istanbul ignore else */
    if (msg) {
        flows.handleError(this,logMessage,msg);
    }
};

/**                                                                         
 * If called with no args, returns whether metric collection is enabled     
 */
Node.prototype.metric = function(eventname, msg, metricValue) {
    if (typeof eventname === "undefined") {
     return Log.metric();
    }
    var metrics = {};
    metrics.level = Log.METRIC;
    metrics.nodeid = this.id;
    metrics.event = "node."+this.type+"."+eventname;
    metrics.msgid = msg._msgid;
    metrics.value = metricValue;
    Log.log(metrics);
}

/**                                                                         
 * status: { fill:"red|green", shape:"dot|ring", text:"blah" }              
 */
Node.prototype.status = function(status) {
    flows.handleStatus(this,status);
};

module.exports = Node;