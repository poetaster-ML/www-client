provider "aws" {
  region  = "us-east-1"
}

terraform {
  backend "s3" {
    region = "us-east-1"
    bucket = "poetaster-www-client-tfstate"
    key    = "main.tfstate"
  }
}

locals {
  project_name   = "poetaster-client"
  env            = terraform.workspace
  canonical_name = "${local.project_name}-${terraform.workspace}"
  hostname       = "poets.house"
}

resource "aws_s3_bucket" "origin" {
  bucket = local.hostname
  acl    = "public-read"
}

resource "aws_cloudfront_distribution" "cloudfront" {
  origin {
    origin_id   = aws_s3_bucket.origin.id
    domain_name = local.hostname
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2", "SSLv3"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["HEAD", "GET", "OPTIONS"]
    cached_methods   = ["HEAD", "GET", "OPTIONS"]
    target_origin_id = aws_s3_bucket.origin.id

    forwarded_values {
      query_string = true
      headers      = ["*"]
      cookies {
        forward = "all"
      }
    }

    # viewer_protocol_policy = "redirect-to-https"
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = local.env
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
