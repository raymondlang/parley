# == Schema Information
#
# Table name: workspaces
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer
#
# Indexes
#
#  index_workspaces_on_name  (name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => users.id)
#


class Workspace < ApplicationRecord
    validates :name, presence: true, uniqueness: true

	belongs_to :owner,
		primary_key: :id,
		foreign_key: :owner_id,
		class_name: :User

	has_many :workspace_users,
		foreign_key: :workspace_id,
		class_name: :WorkspaceUserSubscription,
		dependent: :destroy

	has_many :workspace_users,
		through: :workspace_subscriptions
end
