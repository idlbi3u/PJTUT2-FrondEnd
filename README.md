# PJTUT2-FrondEnd

### REDUX INFO
Nous n'avions pas choisi d'utiliser REDUX au début du projet, nous avons donc pris le temps de créer une branch `redux_branch` que vous pourrez tester, pour le CRUD client. 
Si nous voulions refaire l'application sous REDUX cela aurait pris trop de temps, et nous aurions dû négliger d'autres features majeurs. 

### SOMMAIRE 

1. Présentation
2. Pré-requis
3. Installation du projet #WEB
4. Installation du projet #MOBILE
5. Installation du projet #DESKTOP


## Présentation 
Ce projet est une application de gestion d'un cabinet d'avocats. 
Vous pourrez y ajouter des clients, et des affaires de justice, et faire les liens entres ces affaires et les clients.
Ce projet permet, en partant d'un seul et même code source de build une application Web, une application Mobile, et une application Desktop.

## Pré-requis

* Un IDE (Webstorm, Vscode...)
* WAMP / XAMPP
* La partie serveur du projet : `https://github.com/CalvetYann/PJTUT2-BackEnd.git` et lancée
* Android studio
* NPM

## Installation du projet #WEB
![image](https://user-images.githubusercontent.com/77775081/162493940-3386bc9c-cd9e-484e-b5a2-312a0a9c7658.png)

* Cloner le projet : `https://github.com/idlbi3u/PJTUT2-FrondEnd.git`
* Lancez le projet dans votre IDE favori. 
* Entrez la commande `npm install` dans votre terminal 
* Lancez WAMP64
* Lancez le server node.js, si vous ne savez pas comment, suivez le guide => `https://github.com/CalvetYann/PJTUT2-BackEnd`
* Lancez la commande `npm start` dans le projet Front-end
* L'application se lance dans votre navigateur, vous n'avez plus qu'à la tester.


## Installation du projet #MOBILE
![image](https://user-images.githubusercontent.com/77775081/162492982-a2bd2597-60ce-4b3b-92c3-e75c38678efb.png)


Pour la version mobile, nous avons besoin de faire quelques modifications.

* Lancez la commande `ionic cap build android` afin de build la version android du projet

Une fois la commande executée, veuillez vous rendre le dossier suivant : `./android/app/src/main/AndroidManifest.xml`, en effet l'environnement Android ne comprends pas le `localhost` et doit utiliser `http://10.0.2.2/`.

Effectuez les modifications suivantes : 
```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="io.ionic.starter">
    <application
            android:allowBackup="true"
            android:icon="@mipmap/ic_launcher"
            android:label="@string/app_name"
            android:roundIcon="@mipmap/ic_launcher_round"
            android:supportsRtl="true"
            android:networkSecurityConfig="@xml/network_security_config"
            android:usesCleartextTraffic="true"
            android:theme="@style/AppTheme">
        <activity
                android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
                android:name="io.ionic.starter.MainActivity"
                android:label="@string/title_activity_main"
                android:theme="@style/AppTheme.NoActionBarLaunch"
                android:launchMode="singleTask">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <provider
                android:name="androidx.core.content.FileProvider"
                android:authorities="${applicationId}.fileprovider"
                android:exported="false"
                android:grantUriPermissions="true">
            <meta-data
                    android:name="android.support.FILE_PROVIDER_PATHS"
                    android:resource="@xml/file_paths"></meta-data>
        </provider>
    </application>
    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
</manifest>
```


* Puis rendez vous dans le dossier suivant : `./android/app/src/main/rs/xml` et créez un fichier : `network_security_config.xml`

Une fois fait, collez le code suivant : 
```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
    </domain-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system"/>
        </trust-anchors>
    </base-config>
</network-security-config>
```

* Lancez ensuite la commande : `ionic cap build android`
* Une fois dans Android studio, vous pouvez lancer le projet sur votre émulateur

## Installation du projet #DESKTOP

![image](https://user-images.githubusercontent.com/77775081/162493526-83d6d6bc-a314-455e-8b12-ced9db8981a4.png)

Pour la version Electron il est nécessaire d'avoir un dossier `src/data` dans le cas ou ce dossier n'apparaît pas.

 * Lancez la commande `npm run electron-serve` afin de démarrer la version Electron du projet

Lorque la fenêtre s'ouvre la console peut bloquer la vue du menu, dans ce cas mettre l'application en plein écran ou fermer la console (il est également possible d'ouvrir le menu comme la version mobile, en glissant avec sa souris du bord gauche de la fenêtre vers le centre).

La différence avec les autres versions est l'utilisation du LocalStorage via des fichiers JSON.

Un problème récurrent de cette version est le refresh des datas sur les différentes pages.

 * Elements fonctionnels :
    * Ajout, modification et suppression de clients et d'affaires
    * Ajout d'évenements aux affaires
    * Lien entre affaires et clients (via le fichier case_client.json)

 * Problèmes connus : 
    * Affichage des affaires dans la page détails d'un client (l'affichage des clients d'une affaire se fait après avoir appuyé sur le bouton permettant d'ajouter un évenement)
    * Mise à jour des données après ajout, modification ou suppression des données
