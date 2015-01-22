System.register([], function (_export) {
  "use strict";

  var _prototypeProperties, ListenerExpression, Listener;
  return {
    setters: [],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) {
        if (staticProps) Object.defineProperties(child, staticProps);
        if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
      };

      ListenerExpression = (function () {
        var ListenerExpression = function ListenerExpression(eventManager, targetEvent, sourceExpression, delegate, preventDefault) {
          this.eventManager = eventManager;
          this.targetEvent = targetEvent;
          this.sourceExpression = sourceExpression;
          this.delegate = delegate;
          this.discrete = true;
          this.preventDefault = preventDefault;
        };

        _prototypeProperties(ListenerExpression, null, {
          createBinding: {
            value: function (target) {
              return new Listener(this.eventManager, this.targetEvent, this.delegate, this.sourceExpression, target, this.preventDefault);
            },
            writable: true,
            enumerable: true,
            configurable: true
          }
        });

        return ListenerExpression;
      })();
      _export("ListenerExpression", ListenerExpression);

      Listener = (function () {
        var Listener = function Listener(eventManager, targetEvent, delegate, sourceExpression, target, preventDefault) {
          this.eventManager = eventManager;
          this.targetEvent = targetEvent;
          this.delegate = delegate;
          this.sourceExpression = sourceExpression;
          this.target = target;
          this.preventDefault = preventDefault;
        };

        _prototypeProperties(Listener, null, {
          bind: {
            value: function (source) {
              var _this = this;
              if (this._disposeListener) {
                if (this.source === source) {
                  return;
                }

                this.unbind();
              }

              this.source = source;
              this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function (event) {
                var prevEvent = source.$event;
                source.$event = event;
                var result = _this.sourceExpression.eval(source);
                source.$event = prevEvent;
                if (_this.preventDefault) {
                  event.preventDefault();
                }
                return result;
              }, this.delegate);
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          unbind: {
            value: function () {
              if (this._disposeListener) {
                this._disposeListener();
                this._disposeListener = null;
              }
            },
            writable: true,
            enumerable: true,
            configurable: true
          }
        });

        return Listener;
      })();
    }
  };
});