import { EntityState } from "@reduxjs/toolkit"

export interface User {
    _id:string
    fullname:string,
    username:string,
    address:string
    email:string,
    bio:string,
    votes:string[],
    food:string[],
    createdAt:string,
    ratings:string[]
}

export interface Food {
    _id:string
    name:string,
    origin:string,
    ingredient:string[],
    steps:string[],
    votes:string[],
    ratings:string[],
    userId:string,
    username:string,
    createdAt:string
    updatedAt:string,
    image:string;
    __v:number
}

export interface Rating {
    _id: string
    foodId: string
    rating: number
    username:string
    createdAt: string
}
  
export interface Vote {
    _id: string
    foodId: string
    username:string
    votesType: "like" | "dislike"
    createdAt: string
}

export interface Step {
    _id: string
    step: string[]
    username: string
    userId: string,
    foodId: string,
    createdAt:string
}

export interface FoodSlice extends EntityState<Food, string> {
    status:"idle" | "failed" | "succeeded" | "loading"
    error: Error | null | string
}

export interface RatingSlice extends EntityState<Rating, string> {
    status:"idle" | "failed" | "succeeded" | "loading"
    error: Error | null | string
}

export interface VoteSlice extends EntityState<Vote, string> {
    status:"idle" | "failed" | "succeeded" | "loading"
    error: Error | null | string
}

export interface StepSlice extends EntityState<Step, string> {
    status:"idle" | "failed" | "succeeded" | "loading"
    error: Error | null | string
}

export interface AddFood {
    name:string,
    origin:string,
    ingredient:string[],
}

export interface UpdateFood extends AddFood{
    _id:string
}

export interface AddRating {
    rating:number
}

export interface AddVote {
    votesType:"like" | "dislike"
}

export interface AddStep {
    step:string[]
}

