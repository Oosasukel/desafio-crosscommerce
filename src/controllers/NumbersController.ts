import { NextFunction, Request, Response } from 'express';
import { getSortedNumbers } from 'services';

export class NumbersController {
  async getNumbers(request: Request, response: Response, next: NextFunction) {
    const {
      query: { limit, page },
    } = request;

    try {
      const { results: numbers, total } = getSortedNumbers(
        Number(limit),
        Number(page)
      );

      return response.json({ total, numbers });
    } catch (error) {
      return next(error);
    }
  }
}

export default NumbersController;
