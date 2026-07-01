#!/bin/sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT_DIR"

ACTION=${1:-up}
OS_NAME=$(uname -s 2>/dev/null || echo unknown)
COMPOSE_KIND=""

print_usage() {
  cat <<'USAGE'
Usage:
  sh scripts/start-docker.sh [command]
  sh run.sh [command]

Commands:
  up       Build and start frontend, backend, and MongoDB. Default.
  down     Stop containers and keep volumes.
  logs     Follow logs from all services.
  clean    Stop containers and remove project volumes.
  restart  Stop, rebuild, and start again.
  build    Build images only.
  ps       Show container status.
  help     Show this help message.
USAGE
}

has_docker_compose_plugin() {
  docker compose version >/dev/null 2>&1
}

has_docker_compose_binary() {
  command -v docker-compose >/dev/null 2>&1
}

choose_compose() {
  case "$OS_NAME" in
    Darwin*)
      # Prefer docker-compose on macOS for compatibility with older Docker Desktop setups.
      if has_docker_compose_binary; then
        COMPOSE_KIND="binary"
      elif has_docker_compose_plugin; then
        COMPOSE_KIND="plugin"
      fi
      ;;
    Linux*)
      # Prefer the modern plugin on Linux, but support the legacy binary too.
      if has_docker_compose_plugin; then
        COMPOSE_KIND="plugin"
      elif has_docker_compose_binary; then
        COMPOSE_KIND="binary"
      fi
      ;;
    *)
      if has_docker_compose_plugin; then
        COMPOSE_KIND="plugin"
      elif has_docker_compose_binary; then
        COMPOSE_KIND="binary"
      fi
      ;;
  esac
}

run_compose() {
  if [ "$COMPOSE_KIND" = "plugin" ]; then
    docker compose "$@"
  else
    docker-compose "$@"
  fi
}

warn_about_local_env_file() {
  if [ ! -f "$ROOT_DIR/.env.docker" ]; then
    return 0
  fi

  if grep -Eq '^(username|password|authenticationDatabase)=(null|undefined)$' "$ROOT_DIR/.env.docker"; then
    echo "Warning: .env.docker contains null Mongo credential values." >&2
    echo "This file is not needed for Docker startup and is ignored by this script." >&2
    echo "If you previously sourced it in your shell, close the terminal or unset those variables." >&2
  fi
}

clear_unsafe_local_database_env() {
  # Avoid leaking locally sourced lowercase values such as username=null into legacy Strapi startup.
  unset username password authenticationDatabase || true

  # Docker Compose sets the required DATABASE_* values explicitly in docker-compose.yml.
  # Empty/null credentials should not be passed to the app because Strapi alpha treats them as real auth values.
  case "${DATABASE_USERNAME:-}" in
    ""|null|undefined) unset DATABASE_USERNAME || true ;;
  esac
  case "${DATABASE_PASSWORD:-}" in
    ""|null|undefined) unset DATABASE_PASSWORD || true ;;
  esac
  case "${DATABASE_AUTHENTICATION_DATABASE:-}" in
    ""|null|undefined) unset DATABASE_AUTHENTICATION_DATABASE || true ;;
  esac
}

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed or not available in PATH." >&2
  echo "Install Docker Desktop, then run this script again." >&2
  exit 1
fi

choose_compose

if [ -z "$COMPOSE_KIND" ]; then
  echo "Docker Compose is not available." >&2
  echo "Install Docker Desktop or install either 'docker compose' or 'docker-compose'." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Docker is installed, but the Docker daemon is not running." >&2
  echo "Start Docker Desktop, then run this script again." >&2
  exit 1
fi

warn_about_local_env_file
clear_unsafe_local_database_env

echo "Detected OS: $OS_NAME"
if [ "$COMPOSE_KIND" = "plugin" ]; then
  echo "Using Docker Compose command: docker compose"
else
  echo "Using Docker Compose command: docker-compose"
fi

case "$ACTION" in
  up|start)
    run_compose up --build
    ;;
  down|stop)
    run_compose down
    ;;
  logs)
    run_compose logs -f
    ;;
  clean|reset)
    run_compose down -v
    ;;
  restart)
    run_compose down
    run_compose up --build
    ;;
  build)
    run_compose build
    ;;
  ps|status)
    run_compose ps
    ;;
  help|-h|--help)
    print_usage
    ;;
  *)
    echo "Unknown command: $ACTION" >&2
    print_usage >&2
    exit 1
    ;;
esac
