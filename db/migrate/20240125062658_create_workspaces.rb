class CreateWorkspaces < ActiveRecord::Migration[7.1]
  def change
    create_table :workspaces do |t|
      t.string :name
      t.integer :owner_id
      t.references :owner, null: false, foreign_key: { to_table: :users}

      t.timestamps
    end

    add_index :workspaces, :name, unique: true

    add_foreign_key :workspaces, :users, column: :owner_id, primary_key: :id

  end
end
