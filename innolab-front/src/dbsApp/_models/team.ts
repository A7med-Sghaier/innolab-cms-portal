/*************************************************************
 * innolab-front - team.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 23.10.18 - 16:47
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/
import {apiUrlBuilder} from '../_helpers/httpHelpers';

export interface Team {

  id: string;
  key: string;
  avatar: string;
  salutation: string;
  first_name: string;
  second_name: string;
  role: string;
  email: string;
  tel_office: string;
  room: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Team implements Team {
  id: string;
  key: string;
  avatar: string;
  salutation: string;
  first_name: string;
  second_name: string;
  role: string;
  email: string;
  tel_office: string;
  room: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(options?: any) {
    this.id = options.id ? options.id : null;
    this.key = options.key ? options.key : null;
    this.avatar = options.avatar ? options.avatar.url : null;
    this.salutation = options.salutation ? options.salutation : null;
    this.first_name = options.first_name ? options.first_name : null;
    this.second_name = options.second_name ? options.second_name : null;
    this.role = options.role ? options.role : null;
    this.email = options.email ? options.email : null;
    this.tel_office = options.tel_office ? options.tel_office : null;
    this.room = options.room ? options.room : null;
    this.location = options.location ? options.location : null;
    this.createdAt = options.createdAt ? options.createdAt : null;
    this.updatedAt = options.updatedAt ? options.updatedAt : null;
  }

  parseToCardView (): any {
    const cardView: any = {};
    cardView.cardType = 'team';
    cardView.avatar = this.avatar ? apiUrlBuilder(this.avatar) : '/assets/images/Anonymous_emblem.svg.png';
    cardView.title = {text: (this.salutation + this.first_name + this.second_name) || '', url: '/team/' + this.id};
    cardView.shortDesc = this.role || '';
    cardView.infos = [
      {key: 'email', text: this.email, icon: 'email'},
      {key: 'tel_office', text: this.tel_office, icon: 'call'},
      {key: 'room', text: this.room, icon: 'business'},
      {key: 'location', text: this.location, icon: 'place'},
    ];


    return cardView;
  }
}
