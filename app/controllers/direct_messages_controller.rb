class DirectMessagesController < ApplicationController

    def show
        @direct_message = DirectMessage.where("id = #{params[:id]}").includes(:messages)
        render 'api/direct_messages/show'
    end
end