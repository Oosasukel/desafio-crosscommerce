import { Request, Response } from 'express';
import { getSortedNumbers } from 'services';

export class NumbersController {
  async getNumbers(request: Request, response: Response) {
    const {
      query: { limit, page },
    } = request;

    const { results: numbers, total } = getSortedNumbers(
      Number(limit),
      Number(page)
    );

    return response.json({ total, numbers });
  }
}

export default NumbersController;
