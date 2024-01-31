# == Schema Information
#
# Table name: direct_messages
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class DirectMessage < ApplicationRecord

    belongs_to :workspace,
		foreign_key: :workspace_id,
		class_name: :Workspace

	has_many :direct_message_subscriptions,
		foreign_key: :direct_message_id,
		class_name: :DirectMessage

	has_many :workspace_users,
		through: :direct_message_subscriptions,
		source: :workspace_user

	has_many :messages,
		as: :messageable,
		dependent: :destroy

    	def getDirectMessageName(workspace_user_id)
		return self.workspace_users[0].full_name if self.workspace_users.length == 1
		users = []
		self.workspace_users.each do |user|
			users << user.full_name if user.id != workspace_user_id
		end
		users
		# users.sort.join(', ')
end
