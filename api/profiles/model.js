const mongoose = require("mongoose");
const {Schema} = mongoose;

// Définition du schéma pour l'expérience professionnelle
const experienceSchema = new Schema({
    title: { type: String, required: true }, 
    company: { type: String, required: true },
    dates: { type: String, required: true }, 
    description: { type: String, required: true } 
});

// Définition du schéma pour le profil utilisateur
const userProfileSchema = new Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    experience: { type: [experienceSchema], default: [] }, 
    skills: { type: [String], default: [] },
    information: { 
        bio: { type: String, default: "" },
        location: { type: String, default: "" },
    }
});


const UserProfile = mongoose.model("User", userProfileSchema);
module.exports = UserProfile;