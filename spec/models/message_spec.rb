require 'rails_helper'

describe Message do
  describe '#create' do

    it "is valid with a body" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end

    it "is valid with an image" do
      message = build(:message, body: nil)
      expect(message).to be_valid
    end

    it "is valid with an image and a body" do
      message = build(:message)
      expect(message).to be_valid
    end

    it "is invalid without an image and a body" do
      message = build(:message, image: nil, body: nil)
      message.valid?
      expect(message.errors[:image]).to include("を入力してください")
    end

    it "is invalid without a group_id" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "is invalid without a user_id" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
end
