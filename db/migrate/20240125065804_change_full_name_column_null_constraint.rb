class ChangeFullNameColumnNullConstraint < ActiveRecord::Migration[7.1]
  def change
    change_column_null :workspace_user_subscriptions, :full_name, false
  end
end
