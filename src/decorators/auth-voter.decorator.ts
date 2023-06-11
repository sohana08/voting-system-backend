import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export function AuthVoter() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const voter = request.user;

    if (voter?.[Symbol.for('isPublic')]) {
      return;
    }

    return voter;
  })();
}
