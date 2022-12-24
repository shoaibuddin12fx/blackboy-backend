const Authorize = {
    admin: {
        shop: {
            create: true,
            read: true,
            update: true,
            delete: true,
        },
    },
    student: {
        shop: {
            create: false,
            read: true,
            update: false,
            delete: false,
        }
    },
    therapist: {
        shop: {
            create: false,
            read: true,
            update: false,
            delete: false,
        }
    }
}
export default Authorize