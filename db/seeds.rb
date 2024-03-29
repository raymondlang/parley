# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


ApplicationRecord.transaction do
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    WorkspaceUserSubscription.destroy_all
    Workspace.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')

    ApplicationRecord.connection.reset_pk_sequence!('workspaces')
    ApplicationRecord.connection.reset_pk_sequence!('workspace_user_subscriptions')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(email: 'demo1@user.io', password: 'password')
    User.create!(email: 'demo2@user.io', password: 'password')
    User.create!(email: 'chris@user.io', password: 'pwchris')
    User.create!(email: 'lauren@user.io', password: 'pwlauren')
    User.create!(email: 'austin@user.io', password: 'pwaustin')
    User.create!(email: 'devon@user.io', password: 'pwdevon')

    puts "Creating workspaces..."

    Workspace.create!(name: 'App Academy', owner_id: 3)
    Workspace.create!(name: 'Bay Area Ultimate', owner_id: 4)

    puts "Creating workspace user subscriptions..."

    WorkspaceUserSubscription.create!(user_id: 1, workspace_id: 1, full_name: 'Demo 1')
    WorkspaceUserSubscription.create!(user_id: 2, workspace_id: 1, full_name: 'Demo 2')
    WorkspaceUserSubscription.create!(user_id: 3, workspace_id: 1, full_name: 'Chris Cheasty', display_name: 'Chris C', title: 'Instructor')
    WorkspaceUserSubscription.create!(user_id: 4, workspace_id: 1, full_name: 'Lauren Cary', title: 'Student')
    WorkspaceUserSubscription.create!(user_id: 4, workspace_id: 2, full_name: 'Lauren Cary', display_name: 'LC', title: 'FAB Captain')
    WorkspaceUserSubscription.create!(user_id: 5, workspace_id: 2, full_name: 'Austin Cary')
    WorkspaceUserSubscription.create!(user_id: 6, workspace_id: 2, full_name: 'Devon Armstrong', title: 'League Organizer', pronunciation: 'd-EH-v-ih-n')

        puts "Done!"
	end
