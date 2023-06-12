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