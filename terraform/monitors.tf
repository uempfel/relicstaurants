resource "newrelic_synthetics_monitor" "uptime" {

  status           = "ENABLED"
  name             = "relicrestaurants-uptime"
  period           = "EVERY_HOUR"
  uri              = "http://relicrestaurants.uempfel.de"
  type             = "SIMPLE"
  locations_public = ["EU_CENTRAL_1", "AWS_EU_WEST_2", "AWS_EU_SOUTH_1"]


  treat_redirect_as_failure = true
  validation_string         = "success"
  bypass_head_request       = true
  verify_ssl                = false

  tag {
    key    = "managed_by"
    values = ["terraform"]
  }
}

resource "newrelic_synthetics_script_monitor" "monitor" {
  for_each = fileset("${path.module}/monitors", "*")

  status           = "ENABLED"
  name             = trimsuffix(each.key, ".js")
  type             = "SCRIPT_BROWSER"
  locations_public = ["EU_CENTRAL_1"]
  period           = "EVERY_6_HOURS"

  enable_screenshot_on_failure_and_script = false

  script = file("${path.module}/monitors/${each.value}")

  runtime_type_version = "100"
  runtime_type         = "CHROME_BROWSER"
  script_language      = "JAVASCRIPT"

  tag {
    key    = "managed_by"
    values = ["terraform"]
  }
}

resource "newrelic_synthetics_secure_credential" "cred" {
  for_each    = local.creds
  key         = each.key
  value       = each.value.value
  description = try(each.value.description, null)
}

locals {
  creds = {
    NR_EMAIL = {
      value = "bastian.scherber@googlemail.com"
    }
    NR_PASSWORD = {
      value = var.nr_password
    }
  }
}