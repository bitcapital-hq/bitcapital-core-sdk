"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class BaseModel {
    constructor(data) {
        this.id = data.id;
        if (data.createdAt) {
            this.createdAt = new Date(data.createdAt);
        }
        if (data.updatedAt) {
            this.updatedAt = new Date(data.createdAt);
        }
    }
    /**
     * Returns true if the model is valid or an array of validation errors if invalid
     *
     * @param {boolean} [toString] If toString is true, this will return a formatted error string
     */
    isValid(toString) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(this);
            if (errors.length === 0) {
                return true;
            }
            if (toString) {
                return errors.map(error => error.toString(true)).join("; ");
            }
            return errors;
        });
    }
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], BaseModel.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], BaseModel.prototype, "createdAt", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], BaseModel.prototype, "updatedAt", void 0);
exports.default = BaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9CYXNlL0Jhc2VNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdGO0FBUWhGO0lBU0UsWUFBWSxJQUFTO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUVsQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxRQUFrQjs7WUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLFFBQVEsRUFBRTtnQkFDWixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdEO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0Y7QUFuQ0M7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sRUFBRTs7cUNBQ0c7QUFFRTtJQUFiLDRCQUFVLEVBQUU7OEJBQWEsSUFBSTs0Q0FBQztBQUVqQjtJQUFiLDRCQUFVLEVBQUU7OEJBQWEsSUFBSTs0Q0FBQztBQVBqQyw0QkFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc09wdGlvbmFsLCBJc1VVSUQsIHZhbGlkYXRlLCBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZU1vZGVsU2NoZW1hIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGNyZWF0ZWRBdD86IHN0cmluZyB8IERhdGU7XG4gIHVwZGF0ZWRBdD86IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VNb2RlbCB7XG4gIEBJc09wdGlvbmFsKClcbiAgQElzVVVJRCgpXG4gIGlkPzogc3RyaW5nO1xuXG4gIEBJc09wdGlvbmFsKCkgY3JlYXRlZEF0PzogRGF0ZTtcblxuICBASXNPcHRpb25hbCgpIHVwZGF0ZWRBdD86IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG5cbiAgICBpZiAoZGF0YS5jcmVhdGVkQXQpIHtcbiAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgIH1cbiAgICBpZiAoZGF0YS51cGRhdGVkQXQpIHtcbiAgICAgIHRoaXMudXBkYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG1vZGVsIGlzIHZhbGlkIG9yIGFuIGFycmF5IG9mIHZhbGlkYXRpb24gZXJyb3JzIGlmIGludmFsaWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBbdG9TdHJpbmddIElmIHRvU3RyaW5nIGlzIHRydWUsIHRoaXMgd2lsbCByZXR1cm4gYSBmb3JtYXR0ZWQgZXJyb3Igc3RyaW5nXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNWYWxpZCh0b1N0cmluZz86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZyB8IHRydWUgfCBWYWxpZGF0aW9uRXJyb3JbXT4ge1xuICAgIGNvbnN0IGVycm9ycyA9IGF3YWl0IHZhbGlkYXRlKHRoaXMpO1xuXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0b1N0cmluZykge1xuICAgICAgcmV0dXJuIGVycm9ycy5tYXAoZXJyb3IgPT4gZXJyb3IudG9TdHJpbmcodHJ1ZSkpLmpvaW4oXCI7IFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXJyb3JzO1xuICB9XG59XG4iXX0=