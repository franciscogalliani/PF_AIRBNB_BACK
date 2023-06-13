export interface UserAttributes {
    id_usuario: string
    name?: string
    surname?: string
    email: string
    address?: string
    number?: number
    date?: Date
    gender?: 'Male' | 'Female' | 'Other'
    image?: string
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

export interface PropertyAttributes {
    id_property: number
    title: string
    province: string
    location: string
    address: string
    zip_code: string
    property_type: 'House' | 'Apartment' | 'Room'
    description: string
    price_per_night: number
    images: string[]
    rating?: number
    ratings_amount?: number
    start_date: Date
    end_date: Date
    is_active: boolean
    rooms_number: number
    bathrooms_number: number
    beds_number: number
    max_guests: number
    allow_pets: boolean
    weekly_discount: boolean
    monthly_discount: boolean
    min_nights: number
}

interface BedsType {
    name: string    
    amount: number
    room: number
}

export interface ServiceAttributes {
    service_id: number
    name: string
    icon: string
}