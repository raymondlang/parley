class WorkspacesController < ApplicationController
  def index
  end

  def show
    		@workspace = Workspace.where("id = #{params[:id]}").includes(:workspace_users)
		# debugger
		render :show
  end

  def create
  end

  def update
  end

  def delete
  end
end
