export interface UserAttributes {
    id: string
    name?: string
    surname?: string
    email: string
    address: string
    number: number
    date: Date
    gender: 'Male' | 'Female' | 'Other'
    image: string
    user_type: 'User' | 'Owner' | 'Admin'
    is_active: boolean
}


export interface RatingAttributes {
    rating_id: number
    total_rating: number
    cleaning_rating: number
    communication_rating: number
    price_quality_rating: number
    veracity_rating: number
    description_rating?: string
    date_rating: Date
}


export interface RentAttributes {
    rent_id: number
    start_date: Date
    end_date: Date
    amount: number
    payment_status: boolean
    Payment_date: Date
    creation_date: Date
    active : boolean

}