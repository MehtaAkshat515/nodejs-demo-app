
resource "google_container_cluster" "primary" {
  name               = "nodejs-demo"  # cluster name
   location          = "us-central1-c"
  initial_node_count = 2               # number of node (VMs) for the cluster

  master_auth {
    username = "akshatmehta40@gmail.com"
    password = "AxatMehta@515"

    client_certificate_config {
      issue_client_certificate = false
    }
  }

  provisioner "local-exec" {

    command = "gcloud container clusters get-credentials nodejs-demo --zone us-central1-c --project nodejs-demo-346304"
  }

  node_config {
    preemptible  = true
    machine_type = "e2-micro"

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    metadata = {
      disable-legacy-endpoints = "true"
    }

    tags = ["nodejs-demo-nirma"]
  }

  timeouts {
    # time out after 45 min if the Kubernetes cluster creation is still not finish
    create = "45m" 
    update = "60m"
  }
}


resource "google_compute_firewall" "nodeports" {
  name    = "node-port-range"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["30000-32767", "80", "443", "8080", "22"]  # valid ports in kubernetes is 30000-32767
  }
  allow {
    protocol = "icmp"
  }
  source_ranges = ["0.0.0.0/0"]
}
