terraform {
  required_version = "~> 1.5"
  required_providers {
    newrelic = {
      source  = "newrelic/newrelic"
      version = "~> 3.24"
    }
  }
}

provider "newrelic" {
  account_id = "3982854"
  region     = "EU"
}

resource "newrelic_one_dashboard_json" "json" {
  for_each = fileset("${path.module}/dashboards", "*") # could use ** instead for a recursive search

  json = file("${path.module}/dashboards/${each.value}")
}