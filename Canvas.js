var App;
(function (App) {
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;

            this.doRotateColorShell = function (centreX, centreY) {
                var ctx = _this.ctx;
                var i = 0;
                var currentX = centreX;
                var currentY = centreY;
                var radius = 1;
                var initial = {
                    radius: radius,
                    x: currentX,
                    y: currentY
                };
                ctx.lineWidth = 2;
                _this.drawRotatingColourGoldenArc(i, centreX, centreY, radius, initial);
            };

            this.doRotateColorShell2 = function (centreX, centreY) {
                var ctx = _this.ctx;
                var i = 0;
                var currentX = centreX;
                var currentY = centreY;
                var radius = 1;
                var initial = {
                    radius: radius,
                    x: currentX,
                    y: currentY
                };
                ctx.lineWidth = 2;
                _this.drawRotatingColourGoldenArc2(i, centreX, centreY, radius, initial);
            };

            this.doRotateColorShell3 = function (centreX, centreY, radius) {
                var initialState = {
                    radius: radius,
                    x: centreX,
                    y: centreY
                };
                var currentState = {
                    radius: radius,
                    x: centreX,
                    y: centreY
                };
                _this.drawRotatingColourGoldenArc3(0, currentState, initialState);
            };

            this.canvas = document.getElementById('my-canvas');
            this.ctx = this.canvas.getContext('2d');

            window.setTimeout(() => {
                _this.doRotateColorShell3(-30 + (_this.canvas.width / 2), -40 + (_this.canvas.height / 2), 1);
                window.setTimeout(() => {
                    _this.doRotateColorShell2(-180 + (_this.canvas.width / 2), 20 + (_this.canvas.height / 2));
                    
                }, 2500);
            }, 2500);

            _this.doRotateColorShell(100 + (_this.canvas.width / 2), 20 + (_this.canvas.height / 2));
        }

        ViewModel.prototype.getGoldenSize = function (x) {
            return x * (1 + Math.sqrt(5)) / 2;
        };
        
        ViewModel.prototype.drawRotatingColourGoldenArc = function (j, centreX, centreY, radius, initial) {
            var _this = this;
            var ctx = this.ctx;
            ctx.moveTo(initial.x + radius, initial.y);
            radius = initial.radius;
            centreX = initial.x;
            centreY = initial.y;
            ctx.beginPath();
            for (var i = 1; i < 10; i++) {
                var startAngle = ((2 * Math.PI) * (j / 360)) + ((i - 1) * (Math.PI / 2));
                var endAngle = ((2 * Math.PI) * (j / 360)) + (i * (Math.PI / 2));
                ctx.arc(centreX, centreY, radius, startAngle, endAngle, false);
                ctx.strokeStyle = "rgb(0, " + 255 * (j / 360) + ", 0)";
                ctx.stroke();
                if (((i - 1) % 4) == 0) {
                    centreY -= (radius / this.getGoldenSize(1));
                }
                else if (((i - 2) % 4) == 0) {
                    centreX += (radius / this.getGoldenSize(1));
                }
                else if (((i - 3) % 4) == 0) {
                    centreY += (radius / this.getGoldenSize(1));
                }
                else {
                    centreX -= (radius / this.getGoldenSize(1));
                }
                radius = this.getGoldenSize(radius);
            }
            j++;
            window.setTimeout(function () {
                if (j < 360) {
                    _this.drawRotatingColourGoldenArc(j, centreX, centreY, radius, initial);
                }
            }, 1);
        };
        
        ViewModel.prototype.drawRotatingColourGoldenArc2 = function (j, centreX, centreY, radius, initial) {
            var _this = this;
            var ctx = this.ctx;
            ctx.moveTo(initial.x + radius, initial.y);
            radius = initial.radius;
            centreX = initial.x;
            centreY = initial.y;
            for (var i = 1; i < 10; i++) {
                var startAngle = ((2 * Math.PI) * (j / 360)) + ((i - 1) * (Math.PI / 2));
                var endAngle = ((2 * Math.PI) * (j / 360)) + (i * (Math.PI / 2));
                ctx.beginPath();
                ctx.arc(centreX, centreY, radius, startAngle, endAngle, false);
                if (j < 360) {
                    ctx.strokeStyle = "rgb(" + 255 * (j / 360) + ", 0, 0)";
                }
                else if (j < 720) {
                    ctx.strokeStyle = "rgb(255, " + 255 * ((j - 360) / 360) + ", 0)";
                }
                else {
                    ctx.strokeStyle = "rgb(255, 255, " + 255 * ((j - 720) / 360) + ")";
                }
                ctx.stroke();
                centreX += ((radius / this.getGoldenSize(1)) * Math.sin(startAngle));
                centreY += ((radius / this.getGoldenSize(1)) * (-1) * Math.cos(startAngle));
                radius = this.getGoldenSize(radius);
            }
            j++;
            window.requestAnimationFrame(function () {
                if (j < 1080) {
                    _this.drawRotatingColourGoldenArc2(j, centreX, centreY, radius, initial);
                }
            });
        };
        ;
        ViewModel.prototype.drawRotatingColourGoldenArc3 = function (j, currentState, initialState) {
            var _this = this;
            var ctx = this.ctx;
            ctx.moveTo(initialState.x + currentState.radius, initialState.y);
            currentState.x = initialState.x;
            currentState.y = initialState.y;
            currentState.radius = initialState.radius;
            for (var i = 1; i < 10; i++) {
                var startAngle = ((2 * Math.PI) * (j / 360)) + ((i - 1) * (Math.PI / 2));
                var endAngle = ((2 * Math.PI) * (j / 360)) + (i * (Math.PI / 2));
                ctx.beginPath();
                ctx.arc(currentState.x, currentState.y, currentState.radius, startAngle, endAngle, false);
                ctx.strokeStyle = "rgb(" + 255 * (j / 360) + ", 0, 0)";
                ctx.stroke();
                currentState.x += ((currentState.radius / this.getGoldenSize(1)) * Math.sin(startAngle));
                currentState.y += ((currentState.radius / this.getGoldenSize(1)) * (1) * Math.cos(startAngle));
                currentState.radius = this.getGoldenSize(currentState.radius);
            }
            j++;
            window.setTimeout(function () {
                if (j < 360) {
                    _this.drawRotatingColourGoldenArc3(j, currentState, initialState);
                }
            }, 1);
        };
        return ViewModel;
    }());
    var vm = new ViewModel();
    ko.applyBindings(vm);
})(App || (App = {}));