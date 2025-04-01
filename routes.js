const router = require("express").Router();
const controller = require("./api/profiles/controller.js");

// Route GET pour récupérer tous les profils
router.get("/profiles", 
    controller.getProfiles
);

// Route GET pour récupérer un profil via son id
router.get("/profiles/:id",
     controller.getProfile
);

// Route POST pour créer un nouveau profil
router.post("/profiles",
     controller.createProfile
);

// Route PUT pour mettre à jour un profil existant
router.put("/profiles/:id", 
    controller.updateProfile
);

// Route DELETE pour supprimer un profil via son id
router.delete("/profiles/:id",
     controller.deleteProfile
);

// Route POST pour ajouter une expérience à un profil
router.post("/profiles/:id/experience", 
    controller.addExperience
);

// Route DELETE pour supprimer une expérience spécifique d'un profil
router.delete("/profiles/:id/experience/:expId", 
    controller.deleteExperience
);

// Route POST pour ajouter une compétence à un profil
router.post("/profiles/:id/skills",
     controller.addSkill
);

// Route DELETE pour supprimer une compétence spécifique d'un profil
router.delete("/profiles/:id/skills/:skill", 
    controller.deleteSkill
);

// Route PUT pour éditer les informations d'un profil
router.put("/profiles/:id/information", 
    controller.editInformation
);


// --------------------------------  BONUS -----------------------------

// Route pour ajouter un ami
router.post("/profiles/:id/friends/:friendId", controller.addFriend);

// Route pour supprimer un ami
router.delete("/profiles/:id/friends/:friendId", controller.removeFriend);

// Route pour récupérer un profil avec les amis
router.get("/profiles/:id/with-friends", controller.getProfileWithFriends);


module.exports = router;