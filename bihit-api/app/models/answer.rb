class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user
  scope :question_id, -> (question_id) { where question_id: question_id }
  validates :title, presence: true
  validates :question_id, presence:true
  validates :user_id, presence:true
end
