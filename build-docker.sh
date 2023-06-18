#!/usr/bin/env bash
npm ci
npm run build
docker build -t relicrestaurants .
