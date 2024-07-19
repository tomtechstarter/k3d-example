# Einführung Kubernetes

## Docker

- `docker login`
- `docker build -t tomtechstarter/testapp-express-backend:latest .`
- `docker push tomtechstarter/testapp-express-backend:latest`

## K3d & kubectl

- `k3d cluster create my-first-cluster --api-port 6550 -p "8081:80@loadbalancer" --agents 2`
- `kubectl get services`
- `kubectl get pods -o wide`: Detaillierte Infos zu den Pods
- `kubectl run curl-test --image=radial/busyboyplus:curl -i --tty`: Loggt sich auf das k3s Cluster ein
- `kubectl get pods - kube-system | grep traefik`
- `kubectl port-forward service/testapp-backend-service 4040:4040`: Kann einzelne Services auf die Loakle Maschien mappen
- `kubectl logs -l app=testapp`: Zeigt Logs mit dem label app: testapp an
- `kubectl delete ingress testapp-ingress`
- `k3d cluster delete --all`

## Recap aus dem Kurs

### Vorrausetzungen

- Ihr habt k3d installiert und Zugriff auf die Befehle `kubectl` und `k3d`
- Ihr habt in Docker-Hub das image hochgeladen
  --> `docker login`
  --> `docker build -t <docker-hub-username>/testapp-express-backend:latest .`
  --> `docker push <docker-hub-username>/testapp-express-backend:latest`

### Cluster Erstellen

`k3d cluster create my-first-cluster --api-port 6550 -p "8081:80@loadbalancer" --agents 2`

Mit dem Befehl erstellen wir ein k3d Cluster mit einem Master node und 2 Worker nodes (--agents 2).
Da k3d lokal läuft, soll das quasi die virtuellen Maschinen simulieren.
--api-port 6550 gibt an, über welchen Port, die Worker nodes mit dem Master node kommunizieren.
der Port 8081 soll der Port sein, welche den Loadbalancer (in Kubernetes über HTTP, PORT 80 erreichbar) anspricht. Das mappt also die den Kubernetes Service auf den Lokalen Port unseres Computer (Vergleichbar mit dem Port-Mapping von Docker)

- `kubectl get nodes`: Zeigt verfügbare Master und Worker Nodes an
- `kubectl get pods`: Sollte hier noch leer sein, da wir noch keine Deployments gemacht haben. Pods spiegeln also die einzelnen Replicas wieder

### apply Deployment

- in k3d navigieren (`cd k3d`)
- `kubectl apply -f backend-deployment.yaml`

Der Service definiert, mit welchen Ressourcen, Konfigurationen die app deployed werden soll.
`replicas` gibt and, wie viele Pods auf den Nodes verteilt werden sollten
Hier in dem `backend-deployment.yaml` das richtige container image angeben (aus eurem docker hub repo):
`<docker-hub-username>/testapp-express-backend:latest`

- Zur Kontrolle: `kubectl get pods`

### apply service

- `kubectl apply -f backend-service.yaml`

Fasst alle pods, die folgende labels haben zu einem Service zusammen:

```yaml
selector:
  app: testapp
  tier: backend
```

- Zur Kontrolle: `kubectl get services`

### apply ingress

- `kubectl apply -f ingress.yaml`
  Bestimmt Netzwerk Regeln in K3d

- Zur Kontrolle: `kubectl get ingress`

### Kontrolle

Ihr solltet jetzt auf eurem http://localhost:8081/api die App erreichen
