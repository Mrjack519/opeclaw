#!/bin/bash
openclaw skills install clawpify --acknowledge-clawhub-risk || true
openclaw skills install solo-review --acknowledge-clawhub-risk || true
exec openclaw
