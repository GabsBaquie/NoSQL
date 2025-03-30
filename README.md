# Projet NoSQL - API Profils

Ce projet est une API NoSQL pour la gestion des profils utilisateurs. Il permet de gérer les informations personnelles, les expériences professionnelles et les compétences des utilisateurs.

## Prérequis

- Docker et Docker Compose installés.

## Lancement

Exécutez la commande suivante pour démarrer l'application via Docker :

```bash
docker compose up -d --build
```

## Endpoints de l'API

- **GET /profiles** : Récupérer tous les profils (possibilité de filtrer par `location` et `website`).
- **GET /profiles/:id** : Récupérer un profil spécifique par son identifiant.
- **POST /profiles** : Créer un nouveau profil.
- **PUT /profiles/:id** : Mettre à jour un profil existant (modification de `name` et `email`).
- **DELETE /profiles/:id** : Supprimer un profil.

### Gestion des expériences

- **POST /profiles/:id/experience** : Ajouter une expérience à un profil.
- **DELETE /profiles/:id/experience/:expId** : Supprimer une expérience spécifique d'un profil.

### Gestion des compétences

- **POST /profiles/:id/skills** : Ajouter une compétence à un profil.
- **DELETE /profiles/:id/skills/:skill** : Supprimer une compétence spécifique du profil.

### Informations du profil

- **PUT /profiles/:id/information** : Modifier les informations d'un profil (bio, location, website).

## Structure du projet

- **routes.js** : Définition des routes de l'API.
- **api/profiles/controller.js** : Contient la logique métier pour la gestion des profils.
- **api/profiles/model.js** : Définition du modèle de données du profil (non montré ici).