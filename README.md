# Einführung Kubernetes

- `k3d cluster create my-first-cluster --api-port 6550 -p "8081:80@loadbalancer" --agents 2`
- `kubectl get services`
- `kubectl get pods -o wide`
- `kubectl run curl-test --image=radial/busyboyplus:curl -i --tty`
- `kubectl get pods - kube-system | grep traefik`
- `kubectl port-forward service/tesapp-backend-service 4040:4040`
- `kubectl logs -l app=testapp`
- `kubectl delete ingress testapp-ingress`
- `k3d cluster delete --all`
