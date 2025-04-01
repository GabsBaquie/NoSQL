const mongoose = require("mongoose");
const UserProfile = require("./model.js");

// Récupère tous les profils avec filtrage optionnel par location et site web
const getProfiles = async (req, res) => {
    const { location, website } = req.query;

    const searchFilter = {};
    if (location) {
        searchFilter["information.location"] = location;
    }
    if (website) {
        searchFilter["information.website"] = website;
    }

    try {
        const profiles = await UserProfile.find(searchFilter);
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des profils" });
    }
}

// Récupère un profil par son identifiant
const getProfile = async (req, res) => {
    try {
        const profile = await UserProfile.findById(req.params.id);
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du profil" });
    }
}

// Crée un nouveau profil à partir des données fournies
const createProfile = async (req, res) => {
    try {
        const newProfile = new UserProfile(req.body);
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création du profil" });
    }
}

// Met à jour le profil identifié par son id avec les nouvelles données (name, email)
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await UserProfile.findByIdAndUpdate
            (id, { name, email }, { new: true });
        res.json({ message: "Profil modifié avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la modification du profil" });
    }
}

// Supprime le profil identifié par son id
const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        await UserProfile.findByIdAndDelete(id);
        res.json({ message: "Profil supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du profil" });
    }
}

// Ajoute une expérience au profil identifié par son id
const addExperience = async (req, res) => {
    const { id } = req.params;
    const { title, company, dates, description } = req.body;
    try {
        const profile = await UserProfile.findById(id);
        profile.experience.push({ title, company, dates, description });
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de l'experience" });
    }
}

// Supprime une expérience spécifique du profil via son id et l'id de l'expérience
const deleteExperience = async (req, res) => {
    const { id, exp } = req.params;
    try {
        const profile = await UserProfile.findById(id);
        const experienceToDelete = profile.experience.id(exp);
        experienceToDelete.remove();
        await profile.save();
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'experience" });
    }
}

// Ajoute une compétence au profil identifié par son id
const addSkill = async (req, res) => {
    const { id } = req.params;
    const { skill } = req.body;
    try {
        const profile = await UserProfile.findById(id);
        profile.skills.push(skill);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du skill" });
    }
}

// Supprime une compétence spécifique du profil en se basant sur l'id et le nom de la compétence
const deleteSkill = async (req, res) => {
    const { id, skill } = req.params;
    try {
        const profile = await UserProfile.findById(id);
        const skillToDelete = profile.skills.indexOf(skill);
        profile.skills.splice(skillToDelete, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression skill" });
    }
}

// Modifie les informations (bio, location, website) du profil identifié par son id
const editInformation = async (req, res) => {
    try {
        const profileId = req.params.id;
        const updatedInfo = req.body;

        // Vérifiez que les données nécessaires sont présentes
        if (!updatedInfo || Object.keys(updatedInfo).length === 0) {
            return res.status(400).json({ error: "Aucune information à mettre à jour" });
        }

        // Mettez à jour le profil dans la base de données
        const result = await UserProfile.findByIdAndUpdate(profileId, updatedInfo, { new: true });

        if (!result) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur lors de la modification des informations :", err);
        res.status(500).json({ error: "Erreur lors de la modification des informations" });
    }
}

// ----------------------------- BONUS -----------------------------------


// Ajoute un ami au profil
const addFriend = async (req, res) => {
    const { id, friendId } = req.params;

    try {
        // Vérification des IDs
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ error: "Identifiants invalides" });
        }

        // Vérification que l'ami existe
        const friend = await UserProfile.findById(friendId);
        if (!friend) {
            return res.status(404).json({ error: "Ami non trouvé" });
        }

        // Vérification que le profil existe
        const profile = await UserProfile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }

        // Vérification que l'on n'ajoute pas le profil comme son propre ami
        if (id === friendId) {
            return res.status(400).json({ error: "Impossible d'ajouter le profil comme son propre ami" });
        }

        // Vérification si l'ami est déjà dans la liste
        if (profile.friends.includes(friendId)) {
            return res.status(400).json({ error: "Cet ami est déjà dans la liste" });
        }

        // Ajout de l'ami
        profile.friends.push(friendId);
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error("Erreur dans addFriend:", error);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'ami" });
    }
};

// Supprime un ami du profil
const removeFriend = async (req, res) => {
    const { id, friendId } = req.params;
    try {
        const profile = await UserProfile.findById(id);
        profile.friends = profile.friends.filter(friend => friend.toString() !== friendId);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'ami" });
    }
};

// Récupère un profil avec les détails des amis
const getProfileWithFriends = async (req, res) => {
    try {
        const profile = await UserProfile.findById(req.params.id).populate("friends", "name email _id");
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }
        res.json(profile);
    } catch (err) {
        console.error("Erreur dans getProfileWithFriends:", err);
        res.status(500).json({ error: "Erreur lors de la récupération du profil avec les amis" });
    }
};

module.exports = {
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    addExperience,
    deleteExperience,
    addSkill,
    deleteSkill,
    editInformation,
    addFriend,
    removeFriend,
    getProfileWithFriends
};