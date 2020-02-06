#!/usr/bin/env bash
set -eu pipefail

FAILURE=1
SUCCESS=0
WEBHOOK_URL="https://hooks.slack.com/services/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"

print_slack_summary() {
    local slack_msg_header
    local slack_msg_body
    local slack_channel

    local repo_url=$CI_PROJECT_URL

    # Populate header and define slack channels
    slack_msg_header=":x: Deploy to ${ENVIRONMENT} failed"
    if [[ "${EXIT_STATUS}" == "${SUCCESS}" ]]; then
        slack_msg_header=":white_check_mark: Deploy to ${ENVIRONMENT} succeeded"
    fi

    slack_channel='deployment'

    # Create slack message body
    slack_msg_body="<$repo_url|Anna backend> with job <$repo_url/-/jobs/${CI_JOB_ID}|${CI_JOB_ID}> by ${GITLAB_USER_NAME} \n<$repo_url/commit/$(git rev-parse HEAD)|$(git rev-parse --short HEAD)> - ${CI_COMMIT_REF_NAME} "
    cat <<-SLACK
            {
                "channel": "${slack_channel}",
                "blocks": [
                  {
                        "type": "section",
                        "text": {
                                "type": "mrkdwn",
                                "text": "${slack_msg_header}"
                        }
                  },
                  {
                        "type": "divider"
                  },
                  {
                        "type": "section",
                        "text": {
                                "type": "mrkdwn",
                                "text": "${slack_msg_body}"
                        }
                  }
                ]
            }
SLACK
}

share_slack_update() {
    payload=$(print_slack_summary)

    curl -X POST                                           \
        --data-urlencode "payload=$payload"  \
        "${WEBHOOK_URL}"
}

share_slack_update
