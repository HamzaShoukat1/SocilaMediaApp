export interface ReelItem {
  _id:string,
  video?:string,
  description:string,
    likeCount?: number;
  likesCount?: number;  
    likes?: number;
      savesCount?: number;
        bookmarks?: number;
  saves?: number;
    commentsCount?: number;
  comments?: any[];
  foodPartner?: string;
}

export interface ProfileItem {
  _id:string
  profile:string
  name:string
  address:string
  totalMeals:number
  customersServed:number
}

export interface CreateFoodType {
  name:string
  file:string
}