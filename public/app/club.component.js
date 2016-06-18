var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var club_service_1 = require('./club.service');
var common_1 = require("@angular/common");
var ClubComponent = (function () {
    function ClubComponent(_clubService) {
        var _this = this;
        this._clubService = _clubService;
        this.clubSelect = new common_1.Control('all');
        this.getAllClubs();
        this.getListOfLocation();
        this.clubSelect.valueChanges.subscribe(function (value) {
            if (value == 'all') {
                _this.getAllClubs();
            }
            else {
                _this.getClubByLocation(value);
            }
        });
    }
    ClubComponent.prototype.getListOfLocation = function () {
        var _this = this;
        this._clubService.getAllClubs().subscribe(function (clubs) {
            var listOfLocation = [];
            jQuery.each(clubs, function (index, club) {
                listOfLocation.push(club.location);
            });
            jQuery.unique(listOfLocation);
            _this.locations = listOfLocation;
        }, function (err) { return console.log(err); });
    };
    ClubComponent.prototype.getAllClubs = function () {
        var _this = this;
        this._clubService.getAllClubs()
            .subscribe(function (clubs) {
            _this.clubs = clubs;
        }, function (err) { return console.log(err); });
    };
    ClubComponent.prototype.getClubByLocation = function (location) {
        var _this = this;
        this._clubService.getAllClubs()
            .subscribe(function (clubs) {
            var clubCollection = [];
            jQuery.each(clubs, function (index, club) {
                if (club.location == location) {
                    clubCollection.push(club);
                }
            });
            _this.clubs = clubCollection;
        }, function (err) { return console.log(err); });
    };
    ClubComponent = __decorate([
        core_1.Component({
            selector: 'my-club',
            templateUrl: 'app/club.component.html',
            providers: [club_service_1.ClubService],
            styleUrls: ['app/club.component.css'],
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [club_service_1.ClubService])
    ], ClubComponent);
    return ClubComponent;
})();
exports.ClubComponent = ClubComponent;
//# sourceMappingURL=club.component.js.map