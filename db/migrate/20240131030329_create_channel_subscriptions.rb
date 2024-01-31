class CreateChannelSubscriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :channel_subscriptions do |t|

      t.timestamps
    end
  end
end
