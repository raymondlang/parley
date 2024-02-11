# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord

    validates :content, :messageable_type, :messageable_id, presence: true
	validates :edited, inclusion: [true, false]

	belongs_to :workspace_author,
		foreign_key: :workspace_author_id,
		class_name: :WorkspaceUserSubscription

	belongs_to :messageable,
		polymorphic: true

	def get_display_time
		if self.created_at.today?
			return self.created_at.localtime.strftime "%l:%M %p"
		else
			return self.created_at.localtime.strftime "%B %d %l:%M %p"
		end
	end
end
