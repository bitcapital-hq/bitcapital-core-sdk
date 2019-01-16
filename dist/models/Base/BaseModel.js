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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9CYXNlL0Jhc2VNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdGO0FBUWhGO0lBU0UsWUFBWSxJQUFTO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUVsQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxRQUFrQjs7WUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLFFBQVEsRUFBRTtnQkFDWixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdEO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0Y7QUFuQ0M7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sRUFBRTs7cUNBQ0c7QUFFRTtJQUFiLDRCQUFVLEVBQUU7OEJBQWEsSUFBSTs0Q0FBQztBQUVqQjtJQUFiLDRCQUFVLEVBQUU7OEJBQWEsSUFBSTs0Q0FBQztBQVBqQyw0QkFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc09wdGlvbmFsLCBJc1VVSUQsIHZhbGlkYXRlLCBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgaWQ/OiBzdHJpbmc7XHJcbiAgY3JlYXRlZEF0Pzogc3RyaW5nIHwgRGF0ZTtcclxuICB1cGRhdGVkQXQ/OiBzdHJpbmcgfCBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlTW9kZWwge1xyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNVVUlEKClcclxuICBpZD86IHN0cmluZztcclxuXHJcbiAgQElzT3B0aW9uYWwoKSBjcmVhdGVkQXQ/OiBEYXRlO1xyXG5cclxuICBASXNPcHRpb25hbCgpIHVwZGF0ZWRBdD86IERhdGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcblxyXG4gICAgaWYgKGRhdGEuY3JlYXRlZEF0KSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGEudXBkYXRlZEF0KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBtb2RlbCBpcyB2YWxpZCBvciBhbiBhcnJheSBvZiB2YWxpZGF0aW9uIGVycm9ycyBpZiBpbnZhbGlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt0b1N0cmluZ10gSWYgdG9TdHJpbmcgaXMgdHJ1ZSwgdGhpcyB3aWxsIHJldHVybiBhIGZvcm1hdHRlZCBlcnJvciBzdHJpbmdcclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgaXNWYWxpZCh0b1N0cmluZz86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZyB8IHRydWUgfCBWYWxpZGF0aW9uRXJyb3JbXT4ge1xyXG4gICAgY29uc3QgZXJyb3JzID0gYXdhaXQgdmFsaWRhdGUodGhpcyk7XHJcblxyXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRvU3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBlcnJvcnMubWFwKGVycm9yID0+IGVycm9yLnRvU3RyaW5nKHRydWUpKS5qb2luKFwiOyBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVycm9ycztcclxuICB9XHJcbn1cclxuIl19