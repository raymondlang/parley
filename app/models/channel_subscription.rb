class ChannelSubscription < ApplicationRecord

    belongs_to :workspace_user,
        foreign_key: :workspace_user_id,
        class_name: :WorkspaceUserSubscription

    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel
end
