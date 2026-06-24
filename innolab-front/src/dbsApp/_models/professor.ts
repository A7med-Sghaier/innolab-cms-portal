/*************************************************************
 * innolab-front - professor.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 23.10.18 - 17:23
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/
import {Team} from './team';

export interface Professor {
  category: string;
}

export class Professor extends Team implements Professor {
  category: string;

  constructor(options: any) {
    super(options);
    this.category = options.category || null;
  }

  parseToCardView (): any {
    const cardView = super.parseToCardView();

    /**
     * add items if required
     */

    return cardView;
  }
}
