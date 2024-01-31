# == Schema Information
#
# Table name: workspace_user_subscriptions
#
#  id            :bigint           not null, primary key
#  display_name  :string
#  full_name     :string           not null
#  pronunciation :string
#  time_zone     :string
#  title         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint           not null
#  workspace_id  :bigint           not null
#
# Indexes
#
#  index_workspace_user_subscriptions_on_user_id       (user_id)
#  index_workspace_user_subscriptions_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
class WorkspaceUserSubscription < ApplicationRecord
  validates :full_name, presence: true

  belongs_to :user
  belongs_to :workspace

  has_many :direct_message_subscriptions,
        foreign_key: :workspace_user_id,
        class_name: :DirectMessageSubscription,
        dependent: :destroy

  has_many :channel_subscriptions,
        foreign_key: :workspace_user_id,
        class_name: :ChannelSubscription,
        dependent: :destroy

  has_many :direct_messages,
        through: :direct_message_subscriptions,
        source: :direct_message

  has_many :channels,
        through: :channel_subscriptions,
        source: :channel
end
