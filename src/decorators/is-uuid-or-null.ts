import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  isUUID,
} from 'class-validator';

// Валидатор
@ValidatorConstraint({ name: 'isNullOrUUID', async: false })
export class IsNullOrUUIDConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return value === null || isUUID(value); // true = валидно
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be null or a valid UUID`;
  }
}

// Декоратор
export function IsNullOrUUID(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNullOrUUIDConstraint,
    });
  };
}
