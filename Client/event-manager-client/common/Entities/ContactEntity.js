class ContactEntity {
    constructor(
        id,
        name,
        phone,
        isOwner = false
    ) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.isOwner = isOwner;
    }
}

export default ContactEntity;