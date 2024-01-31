class CreateDirectMessageSubscriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :direct_message_subscriptions do |t|

      t.timestamps
    end
  end
end
