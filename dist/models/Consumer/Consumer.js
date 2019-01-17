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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
const class_validator_1 = require("class-validator");
class Consumer extends __1.BaseModel {
    constructor(data = {}) {
        super(data);
        this.user = undefined;
        this.taxId = undefined;
        this.addresses = undefined;
        this.documents = undefined;
        this.phones = undefined;
        Object.assign(this, data);
        this.addresses = data.addresses && data.addresses.map(address => new _1.Address(address));
        this.documents = data.documents && data.documents.map(document => new _1.Document(document));
        this.phones = data.phones && data.phones.map(phone => new _1.Phone(phone));
        this.states = data.states && data.states.map(state => new _1.ConsumerState(state));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Consumer.prototype, "taxId", void 0);
exports.Consumer = Consumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0NvbnN1bWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0JBU1c7QUFDWCwwQkFBa0U7QUFDbEUscURBQTZDO0FBVzdDLGNBQXNCLFNBQVEsYUFBUztJQVVyQyxZQUFZLE9BQWdDLEVBQUU7UUFDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBVmQsU0FBSSxHQUFVLFNBQVMsQ0FBQztRQUVWLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFeEMsY0FBUyxHQUFjLFNBQVMsQ0FBQztRQUNqQyxjQUFTLEdBQWdCLFNBQVMsQ0FBQztRQUNuQyxXQUFNLEdBQVksU0FBUyxDQUFDO1FBTTFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksVUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxXQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksZ0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7Q0FDRjtBQWpCZTtJQUFiLDRCQUFVLEVBQUU7O3VDQUEyQjtBQUgxQyw0QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZGRyZXNzLFxuICBBZGRyZXNzU2NoZW1hLFxuICBEb2N1bWVudCxcbiAgRG9jdW1lbnRTY2hlbWEsXG4gIFBob25lLFxuICBQaG9uZVNjaGVtYSxcbiAgQ29uc3VtZXJTdGF0ZSxcbiAgQ29uc3VtZXJTdGF0ZVNjaGVtYVxufSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEsIFVzZXIsIFVzZXJTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHkgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZXJTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICB1c2VyPzogVXNlclNjaGVtYTtcbiAgZG9jdW1lbnRzPzogRG9jdW1lbnRTY2hlbWFbXTtcbiAgcGhvbmVzPzogUGhvbmVTY2hlbWFbXTtcbiAgYWRkcmVzc2VzPzogQWRkcmVzc1NjaGVtYVtdO1xuICB0YXhJZDogc3RyaW5nO1xuICBzdGF0ZXM/OiBDb25zdW1lclN0YXRlU2NoZW1hW107XG59XG5cbmV4cG9ydCBjbGFzcyBDb25zdW1lciBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIENvbnN1bWVyU2NoZW1hIHtcbiAgdXNlcj86IFVzZXIgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKSB0YXhJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIGFkZHJlc3NlczogQWRkcmVzc1tdID0gdW5kZWZpbmVkO1xuICBkb2N1bWVudHM/OiBEb2N1bWVudFtdID0gdW5kZWZpbmVkO1xuICBwaG9uZXM6IFBob25lW10gPSB1bmRlZmluZWQ7XG4gIHN0YXRlcz86IENvbnN1bWVyU3RhdGVbXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPENvbnN1bWVyU2NoZW1hPiA9IHt9KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy5hZGRyZXNzZXMgPSBkYXRhLmFkZHJlc3NlcyAmJiBkYXRhLmFkZHJlc3Nlcy5tYXAoYWRkcmVzcyA9PiBuZXcgQWRkcmVzcyhhZGRyZXNzKSk7XG4gICAgdGhpcy5kb2N1bWVudHMgPSBkYXRhLmRvY3VtZW50cyAmJiBkYXRhLmRvY3VtZW50cy5tYXAoZG9jdW1lbnQgPT4gbmV3IERvY3VtZW50KGRvY3VtZW50KSk7XG4gICAgdGhpcy5waG9uZXMgPSBkYXRhLnBob25lcyAmJiBkYXRhLnBob25lcy5tYXAocGhvbmUgPT4gbmV3IFBob25lKHBob25lKSk7XG4gICAgdGhpcy5zdGF0ZXMgPSBkYXRhLnN0YXRlcyAmJiBkYXRhLnN0YXRlcy5tYXAoc3RhdGUgPT4gbmV3IENvbnN1bWVyU3RhdGUoc3RhdGUpKTtcbiAgfVxufVxuIl19