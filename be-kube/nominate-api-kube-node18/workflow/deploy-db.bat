kubectl apply -f ./../deployments/gp2-storageclass.yaml
kubectl apply -f ./../deployments/mongodb-pvc.yaml
kubectl apply -f ./../deployments/mongodb-deployment.yaml
kubectl apply -f ./../deployments/mongodb-service.yaml