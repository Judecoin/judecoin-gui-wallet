#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -ne 1 ] || [[ "$1" != http* ]]; then
    cat <<EOF >&2
Usage: $0 URL

Download and extract a Judecoin release archive containing judecoind and
judecoin-wallet-rpc. Supported archive formats: zip, tar.bz2, tar.gz, tar.xz.

Official release page:
    https://github.com/Judecoin/judecoin/releases
EOF
    exit 1
fi

if ! [ -f tools/download-judecoin-files.sh ] || ! [ -d bin ]; then
    echo "Run this script from the jude-desktop-wallet project root." >&2
    exit 1
fi

archive_url=$1
archive_name=${archive_url%%\?*}
archive_name=${archive_name##*/}
temp_dir=$(mktemp -d)
archive_path="$temp_dir/$archive_name"

cleanup() {
    rm -rf "$temp_dir"
}
trap cleanup EXIT

curl -L --fail --silent --show-error "$archive_url" -o "$archive_path"

case "$archive_name" in
    *.zip)
        unzip -q "$archive_path" -d "$temp_dir/extracted"
        daemon_name="judecoind.exe"
        wallet_rpc_name="judecoin-wallet-rpc.exe"
        ;;
    *.tar.bz2|*.tbz2)
        mkdir -p "$temp_dir/extracted"
        tar -xjf "$archive_path" -C "$temp_dir/extracted"
        daemon_name="judecoind"
        wallet_rpc_name="judecoin-wallet-rpc"
        ;;
    *.tar.gz|*.tgz)
        mkdir -p "$temp_dir/extracted"
        tar -xzf "$archive_path" -C "$temp_dir/extracted"
        daemon_name="judecoind"
        wallet_rpc_name="judecoin-wallet-rpc"
        ;;
    *.tar.xz|*.txz)
        mkdir -p "$temp_dir/extracted"
        tar -xJf "$archive_path" -C "$temp_dir/extracted"
        daemon_name="judecoind"
        wallet_rpc_name="judecoin-wallet-rpc"
        ;;
    *)
        echo "Unsupported archive format: $archive_name" >&2
        exit 1
        ;;
esac

daemon_path=$(find "$temp_dir/extracted" -type f -name "$daemon_name" -print -quit)
wallet_rpc_path=$(find "$temp_dir/extracted" -type f -name "$wallet_rpc_name" -print -quit)

if [ -z "$daemon_path" ] || [ -z "$wallet_rpc_path" ]; then
    echo "The archive does not contain the required Judecoin executables." >&2
    exit 1
fi

cp "$daemon_path" "bin/$daemon_name"
cp "$wallet_rpc_path" "bin/$wallet_rpc_name"
chmod +x "bin/$daemon_name" "bin/$wallet_rpc_name"

echo "Installed Judecoin executables:"
"bin/$daemon_name" --version
"bin/$wallet_rpc_name" --version
