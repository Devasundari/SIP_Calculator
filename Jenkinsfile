pipeline {
    agent any

    environment {
        IMAGE_NAME = "devasundari/sip-calci"
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Create Firebase Environment') {
            steps {
                withCredentials([
                    string(credentialsId: 'firebase-api-key', variable: 'FIREBASE_API_KEY'),
                    string(credentialsId: 'firebase-auth-domain', variable: 'FIREBASE_AUTH_DOMAIN'),
                    string(credentialsId: 'firebase-project-id', variable: 'FIREBASE_PROJECT_ID'),
                    string(credentialsId: 'firebase-storage-bucket', variable: 'FIREBASE_STORAGE_BUCKET'),
                    string(credentialsId: 'firebase-messaging-sender-id', variable: 'FIREBASE_MESSAGING_SENDER_ID'),
                    string(credentialsId: 'firebase-app-id', variable: 'FIREBASE_APP_ID'),
                    string(credentialsId: 'firebase-measurement-id', variable: 'FIREBASE_MEASUREMENT_ID')
                ]) {
                    sh '''
                        printf '%s\\n' \
                        "VITE_FIREBASE_API_KEY=$FIREBASE_API_KEY" \
                        "VITE_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN" \
                        "VITE_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" \
                        "VITE_FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET" \
                        "VITE_FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID" \
                        "VITE_FIREBASE_APP_ID=$FIREBASE_APP_ID" \
                        "VITE_FIREBASE_MEASUREMENT_ID=$FIREBASE_MEASUREMENT_ID" > .env

                        echo "Firebase .env created"
                        test -s .env
                    '''
                }
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                        docker logout
                    '''
                }
            }
        }
        stage('Update Kubernetes Manifest') {
            steps {
                sh '''
                    sed -i "s|image: devasundari/sip-calci:.*|image: devasundari/sip-calci:$IMAGE_TAG|" k8s/deployment.yml
                    git config --global user.name "Devasundari"
                    git config --global user.email "sundarideva245@gmail.com"

                    git add k8s/deployment.yml
                    git commit -m "Update SIP calculator image to $IMAGE_TAG" || true
                    git push origin HEAD:master

                '''
            }
        }

    }

    post {
        success {
            echo "Docker image pushed successfully!"
        }

        failure {
            echo "Pipeline failed!"
        }
    }
}
